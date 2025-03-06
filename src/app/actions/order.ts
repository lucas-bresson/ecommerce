'use server';

import db from "@/lib/db";

export async function userOrderExists(email: string, productId: string) {
    const order = await db.order.findFirst({ 
        where: { user: { email }, productId }, 
        select: { id: true }
    })

    return order != null
}