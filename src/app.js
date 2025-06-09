import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import followRoutes from "./routes/follow.routes.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(errorHandler)


app.use("/user",userRoutes);
app.use('/profile',profileRoutes);
app.use('/post',postRoutes);
app.use('/like',likeRoutes);
app.use('/comment',commentRoutes);
app.use('/follow',followRoutes);


export default app;