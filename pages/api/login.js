import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { client } from "pages/api/database";

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = await req.body;

  try {
    await client.connect();
    const admin_db = client.db("isno").collection("admin");
    const admin = await admin_db.findOne({ username });
    await client.close();
    if (!admin || admin.password !== password) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const user = { isLoggedIn: true, username, password: admin.password, batches: admin.batches };
    req.session.user = user;
    await req.session.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
