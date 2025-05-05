// app/api/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, surname, email, password } = await request.json();
    // Logic lưu user vào database (ví dụ: MongoDB, Prisma, v.v.)
    console.log("Đăng ký:", { name, surname, email, password });
    return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Đăng ký thất bại" }, { status: 500 });
  }
}