using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BinauralGenesis
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    //  const int MaxFibCount = 256;

    //// GET: api/values
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //  return this.Get(MaxFibCount);
    //}

    /// <summary>
    /// HOLY SHIT!  I have a bad intuition for just how quickly the fib sequence blows the fuck up.
    /// Tried this originally with integers, and it overflows REAL fast!
    /// Then I tried long integers... and they overflow REAL fast!
    /// Then I used BigIntegers... and they're fuckin' soldiers!
    /// </summary>
    /// <param name="n0"></param>
    /// <param name="n1"></param>
    /// <returns></returns>
    //private static IEnumerable<BigInteger> GenerateFibonacci(int n0 = 0, int n1 = 1)
    //{
    //  BigInteger nX = n0, nY = n1, nCurrent;

    //  yield return nX = n0; //i++
    //  yield return nY = n1; //i++

    //  for (int i = 2; i < MaxFibCount; i++)
    //  {
    //    nCurrent = nX + nY;
    //    nX = nY;
    //    nY = nCurrent;
    //    yield return nCurrent;
    //  }
    //}

    #region auto-gen bullshit I don't need (yet)
    //// GET api/values/5
    //[HttpGet("{fibCount}")]
    //public IEnumerable<string> Get(int fibCount)
    //{
    //  //purify our inputs to avoid FUCKING OUR SERVER IN THE ASS!!!!!!!!!
    //  if (fibCount < 0 || fibCount > MaxFibCount)
    //    fibCount = 12;

    //  return
    //    GenerateFibonacci()
    //      .Select(n => n.ToString())
    //      .Take(fibCount);
    //}

    //// POST api/values
    //[HttpPost]
    //public void Post([FromBody]string value)
    //{
    //}

    //// PUT api/values/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody]string value)
    //{
    //}

    //// DELETE api/values/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
    #endregion
  }
}
