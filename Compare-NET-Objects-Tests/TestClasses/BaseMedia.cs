using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KellermanSoftware.CompareNETObjectsTests.TestClasses
{
    public class BaseMedia
    {
        private string _privateString;

        public void SetPrivateString(string value)
        {
            _privateString = value;
        }
    }
}
