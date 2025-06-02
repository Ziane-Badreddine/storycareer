// app/api/users/[id]/route.ts
import clerkClient from '@/lib/clerk';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    const user = await clerkClient.users.getUser(id);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }
}
