import { useEffect, useState } from "react";

const Filter = ({ products }) => { // Accept products as a prop
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered data
    const [searchQuery, setSearchQuery] = useState(""); // Search input

    // Search filter logic
    useEffect(() => {
        if (!products) return; // Prevent errors if products is undefined

        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <div>
            <input
            type="text"
            className="form-control shadow-sm p-2"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredProducts}
        </div>
        
    );
};

export default Filter;
