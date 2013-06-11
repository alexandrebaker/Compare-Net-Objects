using System;
using KellermanSoftware.CompareNETObjectsTests.TestClasses;
using KellermanSoftware.CompareNetObjects;
using NUnit.Framework;
using System.Drawing;
using System.Drawing.Drawing2D;
using Point = System.Drawing.Point;

namespace KellermanSoftware.CompareNETObjectsTests
{
    [TestFixture]
    public class BugTests
    {
        #region Class Variables
        private CompareObjects _compare;
        #endregion

        #region Setup/Teardown

        /// <summary>
        /// Code that is run once for a suite of tests
        /// </summary>
        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {

        }

        /// <summary>
        /// Code that is run once after a suite of tests has finished executing
        /// </summary>
        [TestFixtureTearDown]
        public void TestFixtureTearDown()
        {

        }

        /// <summary>
        /// Code that is run before each test
        /// </summary>
        [SetUp]
        public void Initialize()
        {
            _compare = new CompareObjects();
        }

        /// <summary>
        /// Code that is run after each test
        /// </summary>
        [TearDown]
        public void Cleanup()
        {
            _compare = null;
        }
        #endregion

        #region Tests

        [Test]
        public void WilliamCWarnerTest()
        {
            ILabTest labTest = new LabTest();
            labTest.AlternateContainerDescription = "Test 1";
            labTest.TestName = "Test The Audit";

            ILabTest origLabLest = new LabTest();//this would be in session
            origLabLest.TestName = "Original Test Name";
            origLabLest.AlternateContainerDescription = "Test 2";

            _compare.MaxDifferences = 500;
            bool result = _compare.Compare(labTest, origLabLest);

            Assert.IsFalse(result);
            Assert.IsTrue(_compare.Differences.Count > 0);
            Console.WriteLine(_compare.DifferencesString);
        }

        [Test]
        public void LinearGradient()
        {
            LinearGradientBrush brush1 = new LinearGradientBrush(new Point(), new Point(0, 10), Color.Red, Color.Red);
            LinearGradientBrush brush2 = new LinearGradientBrush(new Point(), new Point(0, 10), Color.Red, Color.Blue);

            Assert.IsFalse(_compare.Compare(brush1, brush2));
        }

        #endregion 
    }
}
