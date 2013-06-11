using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KellermanSoftware.CompareNETObjectsTests.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class ExcludeFromEquality : Attribute
    {
    }
}
