﻿namespace KellermanSoftware.CompareNETObjectsTests.TestClasses
{
    public interface ILabTestPanel
    {
        string LabTestPanelName
        {
            get;
            set;
        }
        System.Guid ParentId
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
