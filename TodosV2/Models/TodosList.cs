namespace TodosV2.Models
{
    public class TodosList
    {
        public int Id { get; set; }

        public string Todo { get; set; }

        public bool Completed { get; set;}

        public DateTime CreatedOn { get; set; }

        public DateTime UpdateOn { get; set; }
    }
}
