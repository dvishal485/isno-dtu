export default function grad(evaluation) {
    const result = {};
    for (const key in evaluation) {
        let subj = evaluation[key];
        let marks = 0;
        for (const marks_component in subj) {
            marks += subj[marks_component];
        }
        result[key] = {};
        result[key]['marks'] = marks;
        if (marks >= 91) result[key]['grade'] = 'O';
        else if (marks >= 81) result[key]['grade'] = 'A+';
        else if (marks >= 71) result[key]['grade'] = 'A';
        else if (marks >= 61) result[key]['grade'] = 'B+';
        else if (marks >= 51) result[key]['grade'] = 'B';
        else if (marks >= 41) result[key]['grade'] = 'C';
        else if (marks >= 31) result[key]['grade'] = 'P';
        else result[key]['grade'] = 'F';
    }
    return result;
}
