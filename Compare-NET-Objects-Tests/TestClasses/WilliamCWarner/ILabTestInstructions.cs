namespace KellermanSoftware.CompareNETObjectsTests.TestClasses
{
    public interface ILabTestInstructions
    {
        string LabTestInstruction
        {
            get;
            set;
        }
        int LabTestInstructionTypeId
        {
            get;
            set;
        }
        System.Guid LabTestId
        {
            get;
            set;
        }
    }
}
