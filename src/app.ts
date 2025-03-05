import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import jiraRoutes from "./routes/jira.routes";
import likesRoutes from "./routes/likes.routes";
import metadataRoutes from "./routes/metadata.routes";
import tagRoutes from "./routes/tag.routes";
import templateRoutes from "./routes/template.routes";
import topicRoutes from "./routes/topic.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(jiraRoutes);
app.use(likesRoutes);
app.use(metadataRoutes);
app.use(tagRoutes);
app.use(templateRoutes);
app.use(topicRoutes);
app.use(userRoutes);

export default app;
