using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity;
namespace API.Data;

public class StoreContext : IdentityDbContext<User>
{
    public StoreContext(DbContextOptions options) : base(options)
    {
        
    }

    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id="6ccc7a63-0da4-41a3-a434-f52d6998b5b9", ConcurrencyStamp="Member", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id="4646de53-3f5d-4f04-8606-1eca2fbba78d", ConcurrencyStamp="Admin", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
