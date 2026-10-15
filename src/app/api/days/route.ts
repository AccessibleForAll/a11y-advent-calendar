import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Day from '@/models/Day';
import type { CreateDayInput } from '@/types/day';
import { handleApiError } from '@/lib/handle-api-error';
import { parseCalendarDate } from '@/lib/validations/day';

export async function GET() {
  try {
    await connectToDatabase();
    const days = await Day.find();
    const response = days.map((day) => ({
      id: day._id.toString(),
      date: day.date,
      heading: day.heading,
      text: day.text,
      linkText: day.linkText,
      link: day.link,
    }));

    return NextResponse.json(response);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = (await request.json()) as CreateDayInput;
    const date = parseCalendarDate(body.date);

    if (!date) {
      return NextResponse.json(
        { message: 'Date must be a valid date in YYYY-MM-DD format' },
        { status: 400 },
      );
    }

    const day = await Day.create({
      date,
      heading: body.heading,
      text: body.text,
      linkText: body.linkText,
      link: body.link,
    });

    return NextResponse.json(
      {
        id: day._id.toString(),
        date: day.date,
        heading: day.heading,
        text: day.text,
        linkText: day.linkText,
        link: day.link,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
