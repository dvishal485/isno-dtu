import { MongoClient } from "mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

const uri = process.env.MONGODB_URI;
export const client = new MongoClient(uri);

export default withIronSessionApiRoute(studentsRoute, sessionOptions);

async function studentsRoute(req, res) {
    const user = req.session.user;
    const id_no = req.query.roll_no;
    const refresh_db = req.query.refresh_db;

    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }

    try {
        await client.connect();
        const roll_no = id_no ? id_no.replace(/\//g, '_') : undefined;
        if (id_no && refresh_db && refresh_db == 'true') {
            const data = await fetch(`https://dtu-student-api.vercel.app/isno_request?roll_number=${roll_no}`)
            const { name, father_name, mother_name, dob, address, personal_email } = await data.json();
            const roll = parseInt(roll_no.split('_')[2])
            const pipeline = [
                {
                    '$match': {
                        'roll_no': roll_no
                    }
                },
                {
                    '$set': {
                        'father': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$father', '-'
                                    ]
                                }, (father_name == '' ? '-' : father_name), {
                                    '$ifNull': [
                                        '$father', (father_name == '' ? '-' : father_name)
                                    ]
                                }
                            ]
                        },
                        'mother': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$mother', '-'
                                    ]
                                }, (mother_name == '' ? '-' : mother_name), {
                                    '$ifNull': [
                                        '$mother', (mother_name == '' ? '-' : mother_name)
                                    ]
                                }
                            ]
                        },
                        'dob': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$dob', '-'
                                    ]
                                }, (dob == '' ? '-' : dob), {
                                    '$ifNull': [
                                        '$dob', (dob == '' ? '-' : dob)
                                    ]
                                }
                            ]
                        },
                        'address': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$address', '-'
                                    ]
                                }, (address == '' ? '-' : address), {
                                    '$ifNull': [
                                        '$address', (address == '' ? '-' : address)
                                    ]
                                }
                            ]
                        },
                        'personal_email': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$personal_email', '-'
                                    ]
                                }, (personal_email == '' ? '-' : personal_email), {
                                    '$ifNull': [
                                        '$personal_email', (personal_email == '' ? '-' : personal_email)
                                    ]
                                }
                            ]
                        },
                        'name': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$name', '-'
                                    ]
                                }, (name == '' ? '-' : name), {
                                    '$ifNull': [
                                        '$name', (name == '' ? '-' : name)
                                    ]
                                }
                            ]
                        },
                        'roll': isNaN(roll) ? '$roll' : roll
                    }
                },
                {
                    $merge: {
                        'into': 'students',
                        'on': 'roll_no',
                        'whenMatched': 'merge',
                        'whenNotMatched': 'insert'
                    }
                }
            ];
            const student =client.db("isno").collection("students").aggregate(pipeline);
            const list = await student.toArray();
            await client.close();
            return res.json(list);
        }
        const batches = user.batches;

        const find_query = roll_no ? { roll_no: roll_no } : {
            $or: batches.map((batch) => ({
                roll_no: {
                    $regex: `^${batch.year}_${batch.branch}_`,
                },
                roll: {
                    $gte: batch.start,
                    $lte: batch.end,
                }
            })),
        }
        const students = await client.db("isno").collection("students").find(
            find_query
        ).toArray();
        await client.close();
        res.json(students);
    } catch (error) {
        console.log(error);
        res.status(200).json([]);
    }
}
