using System;
using System.Collections.Generic;
using System.Linq;
namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItem> Items { get; set; } = new List<BasketItem>();

    public void AddItem(Product product, int quantity) {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.", nameof(quantity));
        var existingItem = FindItemByProductId(product.Id);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            Items.Add(new BasketItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = quantity
            });
        }
    }

    private BasketItem? FindItemByProductId(int productId)
    {
        return Items.FirstOrDefault(i => i.ProductId == productId);
    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.", nameof(quantity));
        var existingItem = FindItemByProductId(productId);
        if (existingItem == null) return;
        existingItem.Quantity -= quantity;
        if (existingItem.Quantity <= 0)
        {
            Items.Remove(existingItem);
        }
    }
}
