import React from "react";
import Image from "next/image";

export default function IDCard(props) {
    const { name, branch, prev_roll } = props;
    var { roll_no } = props;
    roll_no = roll_no.replace(/\//g, "_")
    return (<>
        <div>
            <div className="id-card-top">
                <center style={{
                    padding: "1rem",
                    paddingBottom: "10px"
                }}><strong>DELHI TECHNOLOGICAL UNIVERSITY</strong></center>
                <div className="padder">
                    <Image width="34" style={{ borderRadius: "100%" }} height="34" src='/dtu-logo.png' />
                    <span style={{
                        display: "flex: 1;",
                        fontSize: "7px",
                        textAlign: 'center',
                        width: "100%",
                    }}>
                        (Formerly Delhi College of Engineering)<br />
                        <strong style={{ fontSize: "7px" }}>(Govt. of NCT of Delhi)</strong><br />
                        <span style={{ fontSize: "9px" }}>Shahbad Daulatpur, Main Bawana Road, Delhi, 110042</span>
                    </span>
                </div>
                <hr style={{ boxSizing: "border-box", width: "100%", backgroundColor: "black" }} />
                <center>
                    <Image src={`https://dtu-student-api.vercel.app/get_image?roll_number=${roll_no}`} width="80" height="90" />
                </center><br />
                <div style={{
                    backgroundColor: "#59111A",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    color: "white"
                }}>
                    <center><b>{name}</b></center>
                </div>
                <div style={{
                    paddingTop: "0.5rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "0.2rem",
                    fontSize: "12px",
                }} >
                    <center><b>
                        DTU/{(prev_roll && prev_roll != '') ? prev_roll.replace(/_/g, '/') : roll_no.replace(/_/g, '/')}<br />
                    </b></center>
                </div>
                <div style={{
                    paddingTop: "0.5rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "0.2rem",
                }} ><center>
                        <b>
                            {roll_no.replace(/_/g, '/')}<br />
                            B.Tech ({(branch && branch != '-' && branch != '') ? branch : roll_no.split('_')[1]})
                        </b>
                    </center>
                </div>

                <center><b>
                    Valid Upto :JUL 20{(parseInt(roll_no.split("_")[0].split('K')[1]) + 4)}<br />
                    <Image src='/isno_issuer.png' width='50' height='40' /><br />
                </b></center>
                <center><span style={{ fontSize: "7px", color: "#59111A" }}>Issuing Authority</span></center>
            </div>
            <style jsx>{`
        .id-card-top {
            width: 250px;
            font-size: 11px;
            height: 380px;
            background-color: #ffffff;
            box-sizing: border-box; 
            border: 1px solid black;
            border-radius: 0.5rem;
        }
        .padder {
            display: flex;
            width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        strong {
            color: #59111A;
        }
        `}</style>
        </div>
    </>)
}
