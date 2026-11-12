using System;
using Microsoft.AspNetCore.Http;
using API.RequestHelpers;
using Microsoft.Net.Http.Headers;
namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetadata metadata)
    {
        var options = new System.Text.Json.JsonSerializerOptions
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        };
        response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata, options));
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "X-Pagination");
    }
}
