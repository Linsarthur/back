import { prisma } from "../services/index.js";
export async function getUsuarios() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        return error.message;
    }
}