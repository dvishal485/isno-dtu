import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { client } from "pages/api/database";



export default withIronSessionApiRoute(UploadEval, sessionOptions);

async function UploadEval(req, res) {
    const user = req.session.user;

    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }
    try {
        // post request contains the file of "Content-Type": "multipart/form-data" which is csv file
        const file = req.body;
        if (file.startsWith('singleEval')) {
            const line = file.split('\n')[1];
            const data = line.split(',');
            const roll_no = data[0];
            const subj_code = data[1];
            const cws = parseInt(data[2].trim());
            const mte = parseInt(data[3].trim());
            const prs = parseInt(data[4].trim());
            const ete = parseInt(data[5].trim());
            await client.connect();
            const collection = client.db("isno").collection("students");
            await collection.updateOne(
                { roll_no: roll_no },
                {
                    $set: {
                        evaluation: {
                            [subj_code]: {
                                cws: isNaN(cws) ? 0 : cws,
                                mte: isNaN(mte) ? 0 : mte,
                                prs: isNaN(prs) ? 0 : prs,
                                ete: isNaN(ete) ? 0 : ete,
                            }
                        }
                    }
                }
            );
        } else {
            const csv = file.split('\r\n').at(-3).split('\n');
            const subj_code = csv[0].split(',')[2].split(' ')[0];
            const lines = csv.slice(1, -1);
            await client.connect();
            const collection =client.db("isno").collection("students");
            await lines.forEach(async (line) => {
                let data = line.split(',');
                console.log(data);
                if (data.length < 6) return;
                let roll_no = data[1];
                let cws = parseInt(data[2].trim());
                let mte = parseInt(data[3].trim());
                let prs = parseInt(data[4].trim());
                let ete = parseInt(data[5].trim());
                console.log(roll_no, cws, mte, prs, ete);
                await collection.updateOne(
                    { roll_no: roll_no },
                    {
                        $set: {
                            evaluation: {
                                [subj_code]: {
                                    cws: isNaN(cws) ? 0 : cws,
                                    mte: isNaN(mte) ? 0 : mte,
                                    prs: isNaN(prs) ? 0 : prs,
                                    ete: isNaN(ete) ? 0 : ete,
                                }
                            }
                        }
                    }, { upsert: true }
                )
            });
        }
        res.send({ message: "Updated grades successfully" });
        console.log("Grade uploaded!");
        // close client after successful upload
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
}
