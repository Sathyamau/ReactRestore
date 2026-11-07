using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
namespace API.Middleware
{
    public class ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
           try
           {
               await next(context);
           }
           catch (Exception ex)
           {
              // logger.LogError(ex, ex.Message);
              // context.Response.StatusCode = 500;
               await HandleExceptionAsync(context, ex);
           }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            logger.LogError(ex, ex.Message);
            
            context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            var response = new ProblemDetails
            {
                Status = 500,
                Detail = env.IsDevelopment() 
                    ? ex.StackTrace?.ToString() 
                    : null,
                Title = ex.Message
            };
            await context.Response.WriteAsJsonAsync(response);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}