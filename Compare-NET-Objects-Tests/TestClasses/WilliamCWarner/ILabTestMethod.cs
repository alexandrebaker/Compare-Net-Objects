namespace KellermanSoftware.CompareNETObjectsTests.TestClasses
{
    public interface ILabTestMethod
    {
        System.Guid LabTestId
        {
            get;
            set;
        }
        string LabTestMethod
        {
            get;
            set;
        }
    }
}
