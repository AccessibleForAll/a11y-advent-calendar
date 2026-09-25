import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Day from '@/models/Day';
import type { CreateDayInput } from '@/types/day';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const sort = searchParams.get('sort');

    const filter: { published?: boolean } = {};

    if (published === 'true') {
      filter.published = true;
    }

    let query = Day.find(filter);

    if (sort === 'date') {
      query = query.sort({ date: 1 });
    }

    const days = await query;

    const response = days.map((day) => ({
      id: day._id.toString(),
      date: day.date,
      heading: day.heading,
      text: day.text,
      linkText: day.linkText,
      link: day.link,
      published: day.published,
    }));

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = (await request.json()) as CreateDayInput;

    const day = await Day.create({
      date: body.date,
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
        published: day.published,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
