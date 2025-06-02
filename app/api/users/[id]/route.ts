// app/api/users/[id]/route.ts
import clerkClient from '@/lib/clerk';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await clerkClient.users.getUser(params.id);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }
}
