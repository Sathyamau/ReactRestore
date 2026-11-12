using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.RequestHelpers;

namespace API.Controllers
{   
    public class ProductsController(StoreContext context): BaseApiController
    {
        //https://localhost:5001/api/products

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery]ProductsParams productsParams)
        {
            var query = context.Products
            .Sort(productsParams.OrderBy)
            .Search(productsParams.SearchTerm)
            .Filter(productsParams.Brands, productsParams.Types)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productsParams.PageNumber, productsParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { Brands = brands, Types = types });
        }


    }
}
