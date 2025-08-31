import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../services/index.js";
export async function getUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        return error.message;
    }
}

export async function getUserById(id) {
    try {
        return await prisma.user.findUnique({
            where: { user_id: Number(id) }
        });
    } catch (error) {
        return error.message;
    }
}

export async function createUser(req, res) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.user_password, saltRounds);
    try {
        const { user_name, user_email } = req.body;
        const user = await prisma.user.create({
            data: {
                user_name,
                user_password: hashedPassword,
                user_email
            }
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export async function editUser(req, res) {
    try {
        const { id } = req.params
        const { user_name, user_password, user_email } = req.body;
        const user = await prisma.user.update({
            where: { user_id: Number(id) },
            data: {
                user_name,
                user_password,
                user_email
            }
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await prisma.user.delete({
            where: { user_id: Number(id) }
        });
        return res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function login (dados) {
    try {
        const { user_email, user_password } = dados;
        const user = await prisma.user.findUnique({
            where: { user_email }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(user_password, user.user_password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET)
        return {user, token};
    } catch (error) {
        throw new Error(error.message);
    }
}