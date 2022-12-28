import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { client } from "pages/api/database";

export default withIronSessionApiRoute(genSheet, sessionOptions);


async function genSheet(req, res) {
    const user = req.session.user;
    const { query } = req;

    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }

    try {
        await client.connect();
        /*
        query = {
            "year" : ["2K21"],
            "branch" : ["CO"],
            "subj_code" : "CO204",
            "start" : [1,45],
            "end" : [50,75]
        }
        */
        query['year'] = JSON.parse(query['year']);
        query['branch'] = JSON.parse(query['branch']);
        query['start'] = JSON.parse(query['start']);
        query['end'] = JSON.parse(query['end']);
        //console.log(query)
        const find_query = query.start.map((start, index) => ({
            roll_no: {
                $regex: `^${query.year[index]}_${query.branch[index]}`,
            },
            roll: {
                $gte: start,
                $lte: query.end[index],
            }
        }))
        const students = await client.db(
            "isno").collection(
                "students").find({
                    $or: find_query
                }).sort({
                    roll_no: 1,
                    name: 1,
                }).toArray();
        let csv_file = `Name,Roll Number,${query.subj_code} CWS,${query.subj_code} MTE,${query.subj_code} PRS,${query.subj_code} ETE\n`
        students.map((student) => {
            if (student.evaluation && student.evaluation[query.subj_code]) {
                csv_file += `${student.name},${student.roll_no},${student.evaluation[query.subj_code].cws},${student.evaluation[query.subj_code].mte},${student.evaluation[query.subj_code].prs},${student.evaluation[query.subj_code].ete}\n`;
            } else { csv_file += `${student.name},${student.roll_no},,,,\n`; }
        })
        await client.close();
        const course_code = query['branch'].filter(
            (subject, index, self) =>
                self.indexOf(subject) === index);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="${query.subj_code} Evaluation (${course_code}).csv"`);
        res.send(csv_file);
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
}
