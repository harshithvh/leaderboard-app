import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  name: string;
  email: string;
}

type LeaderboardEntry = User & {
  attempts: number;
}

export async function GET(request: Request) {
  try {
    const params = getSearchParams(request);
    
    const users = await searchUsers(params.search);
    if (!users.length) {
      return NextResponse.json({ data: [], count: 0 });
    }

    const leaderboard = await buildLeaderboard(users, params.minAttempts, params.maxAttempts);

    return NextResponse.json({
      data: leaderboard,
      count: leaderboard.length,
    });
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function getSearchParams(request: Request) {
  const { searchParams } = new URL(request.url);
  return {
    search: searchParams.get('search') || '',
    minAttempts: parseInt(searchParams.get('minAttempts') || '0'),
    maxAttempts: parseInt(searchParams.get('maxAttempts') || '100')
  };
}

async function searchUsers(searchTerm: string): Promise<User[]> {
  const { data: users, error } = await supabase
    .from('User')
    .select('*')
    .ilike('name', `%${searchTerm}%`);

  if (error) throw error;
  return users || [];
}

async function getUserAttemptCount(email: string): Promise<number> {
  const { count, error } = await supabase
    .from('Attempts')
    .select('*', { count: 'exact' })
    .eq('email', email);

  if (error) throw error;
  return count || 0;
}

async function buildLeaderboard(
  users: User[], 
  minAttempts: number, 
  maxAttempts: number
): Promise<LeaderboardEntry[]> {
  const usersWithAttempts = await Promise.all(
    users.map(async (user) => ({
      ...user,
      attempts: await getUserAttemptCount(user.email)
    }))
  );

  return usersWithAttempts.filter(
    user => user.attempts >= minAttempts && user.attempts <= maxAttempts
  );
}