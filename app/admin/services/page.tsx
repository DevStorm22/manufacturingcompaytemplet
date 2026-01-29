import Link from 'next/link';
export default function ServicePage() {
    return(
        <div className="space-y-6">
            <div className="flex justify-between iems-center">
                <h1 className="text-3xl font-bold">Services</h1>
                <Link className="bg-black text-white px-4 py-2 rounded" href="/admin/services/new">Add Service</Link>
            </div>
            <div className="bg-white rounded shadow">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-4">Example Service</td>
                            <td>Active</td>
                            <td className="space-x-2">
                                <Link className="text-blue-600" href="/admin/services/1/edit">Edit</Link>
                                <button className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}