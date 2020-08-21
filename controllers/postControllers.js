const DB = require("../db.js");

exports.getLatestPosts = (req, res) => {
  const getLatestPostsStmt = DB.prepare(
    `SELECT * FROM posts ORDER BY posted_date LIMIT 30;`,
  );
  const latestPosts = getLatestPostsStmt.all();
  if (latestPosts.length > 0) {
    return res.status(200).json(latestPosts);
  } else {
    return res.status(404).json(
      { message: "We do not have posts yet. They are coming soon." },
    );
  }
};

exports.addPost = (req, res) => {
  //run this after verifyAdmin as a middleware
  const { lang, title, slug, summary, thumbnail, content } = req.body;
  //verify all data is present
  if (lang && title && slug && summary && thumbnail && content) {
    const insertPostStmt = DB.prepare(
      `INSERT INTO posts (lang, title, slug, summary, thumbnail, content) VALUES (?,?,?,?,?,?);`,
    );
    const newPostId =
      insertPostStmt.run(lang, title, slug, summary, thumbnail, content)
        .lastInsertRowid;
    const getNewPostStmt = DB.prepare(`SELECT * FROM posts WHERE id= ?;`);
    const newPost = getNewPostStmt.get(newPostId);
    return res.status(200).json({
      status: 200,
      newPost: newPost,
    });
  } else {
    return res.status(400).json({ message: "All fields are required." });
  }
};
exports.updatePost = (req, res) => {
  //run this after verifyAdmin as a middleware
  const { lang, title, summary, thumbnail, content } = req.body;
  const { id } = req.params;
  const updatedDate = new Date().toLocaleString();
  //verify all data is present
  if (id && lang && title && summary && thumbnail && content) {
    const updatePostStmt = DB.prepare(
      `UPDATE posts SET lang =?, title=?, summary =?, thumbnail =?, content=?, updated_date=? WHERE id =?`,
    );

    updatePostStmt.run(
      lang,
      title,
      summary,
      thumbnail,
      content,
      updatedDate,
      id,
    );

    const getLatestPostsStmt = DB.prepare(
      `SELECT * FROM posts ORDER BY posted_date LIMIT 30;`,
    );
    const updatedPosts = getLatestPostsStmt.all();
    return res.status(200).json(
      {
        status: 200,
        updatedPosts: updatedPosts,
      },
    );
  } else {
    return res.status(400).json({ message: "All fields are required." });
  }
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const getPostStmt = DB.prepare(`SELECT id FROM posts WHERE id = ?;`);
    const post = getPostStmt.get(id);
    if (post) {
      const deletePostStmt = DB.prepare(`DELETE FROM posts WHERE id =?;`);
      deletePostStmt.run(id);
      return res.status(200).json({
        status: 200,
        message: "Post is deleted.",
      });
    } else {
      return res.status(404).json({ message: "That post does not exist." });
    }
  } else {
    return res.status(400).json({ message: "Need id to delete the post." });
  }
};
