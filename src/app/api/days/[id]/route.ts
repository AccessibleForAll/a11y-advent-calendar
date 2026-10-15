import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Day from '@/models/Day';
import { handleApiError } from '@/lib/handle-api-error';
import { parseCalendarDate } from '@/lib/validations/day';
import type { UpdateDayInput } from '@/types/day';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function serializeDay(day: {
  _id: { toString: () => string };
  date: Date;
  heading: string;
  text: string;
  linkText?: string;
  link?: string;
}) {
  return {
    id: day._id.toString(),
    date: day.date,
    heading: day.heading,
    text: day.text,
    linkText: day.linkText,
    link: day.link,
  };
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = (await request.json()) as UpdateDayInput;

    const day = await Day.findById(id);

    if (!day) {
      return NextResponse.json({ message: 'Day not found' }, { status: 404 });
    }

    if (body.date !== undefined) {
      const date = parseCalendarDate(body.date);

      if (!date) {
        return NextResponse.json(
          { message: 'Date must be a valid date in YYYY-MM-DD format' },
          { status: 400 },
        );
      }

      day.date = date;
    }

    if (body.heading !== undefined) {
      day.heading = body.heading;
    }

    if (body.text !== undefined) {
      day.text = body.text;
    }

    if (body.linkText !== undefined) {
      day.linkText = body.linkText;
    }

    if (body.link !== undefined) {
      day.link = body.link;
    }

    await day.save();

    return NextResponse.json(serializeDay(day));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const day = await Day.findByIdAndDelete(id);

    if (!day) {
      return NextResponse.json({ message: 'Day not found' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
