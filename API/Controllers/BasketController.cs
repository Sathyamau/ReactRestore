using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NoContent();

       return basket.ToDto();
    }
    
    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        
        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Product not found - Problem adding item to basket");
        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync();
        if (result > 0) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        return BadRequest("Problem saving changes to basket");
    }


    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
         var basket = await RetrieveBasket();
        if (basket == null) return BadRequest("Basket not found - Problem removing item from basket");

        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Product not found - Problem removing item from basket");

        basket.RemoveItem(productId, quantity);
        var result = await context.SaveChangesAsync();
        if (result <= 0) return BadRequest("Problem removing item from basket");

        return Ok();
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
    
        var basket = new Basket  { BasketId = basketId };
        context.Baskets.Add(basket);    
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }


}
