import Link from "next/link";
import { useEffect, useState } from "react"

export default function ProductPage () {
    const [ products, setProducts ] = useState < any [] > ( [] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( "" );

    const fetchProducts = async () => {
        try {
            setLoading( true );
            const res = await fetch( "" );
            
            if ( !res.ok ) {
                throw new Error ( "Failed fetching products" );
            }

            const resJson = await res.json();
            setProducts( resJson || [] );
        }
        catch ( error : any ) {
            setError( error.message );
        }
        finally {
            setLoading( false );
        }
    }

    useEffect ( () => {
            fetchProducts();
        }
    )

    if( !products.length ) {
        <p className = "text-white">No products found!!!</p>
    }

    if( error ) {
        <p className = "text-red-700">{ error }</p>
    }

    if( loading ) {
        <p>Loading...</p>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link className="bg-blue-700 text-white px-4 py-2 rounded" href="/admin/products/new">Add Product</Link>
            </div>
            <div className="bg-white rounded shadow">
                <table className="w-full text-left bg-black border-white">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">State</th>
                            <th className="p-4">Available</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                products.map( (product) => (
                                        <tr key = { product._id } className = "border-t" >
                                            <td className = "p-3">{ product.title }</td>
                                            <td className = "p-3">{ product.slug }</td>
                                            <td className = "p-3">{ product.description }</td>
                                            <td className = "p-3">{ product.price }</td>
                                            <td className = "p-3">{ ( product.isAvailable ) ? "Available" : "Not Available" }</td>
                                            <td className = "p-3"><button className = "text-white bg-blue-700">Edit</button><button className = "text-white bg-red-700">Delete</button></td>
                                        </tr>
                                    )
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    );
}