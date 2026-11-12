using System;
using API.Entities;
namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        return orderBy switch {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm)) return query;
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        if (!string.IsNullOrWhiteSpace(brands))
        {
            var brandList = brands.Trim().ToLower().Split(',');
            query = query.Where(p => brandList.Contains(p.Brand.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(types))
        {
            var typeList = types.Trim().ToLower().Split(',');
            query = query.Where(p => typeList.Contains(p.Type.ToLower()));
        }
        return query;
    }
}
