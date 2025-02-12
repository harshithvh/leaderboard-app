import { UserResponse } from '@/types';

export default function LeaderboardTable({ 
    data, 
    loading 
  }: { 
    data: UserResponse[]; 
    loading: boolean 
  }) {
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Attempts
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y">
          {
            data.length > 0 ? (
                data.map((user) => (
                <tr key={user.id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.attempts}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No users found
                </td>
                </tr>
            )
            }
          </tbody>
        </table>
      </div>
    );
  }