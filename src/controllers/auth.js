import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            // ['Trường tên là bắt buộc', 'Email không đúng định dạng']
            return res.status(400).json({
                messsages: errors,
            });
        }
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign({ _id: user._id }, "banThayDat", { expiresIn: "1d" });

        return res.status(201).json({
            message: "Đăng ký tk thành công",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Bạn chưa đăng ký tài khoản",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const accessToken = jwt.sign({ _id: user._id }, "banThayDat", { expiresIn: "1d" });

        return res.status(201).json({
            message: "Đăng ký tk thành công",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

