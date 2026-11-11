using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options)
    {
        
    }

    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }
}
