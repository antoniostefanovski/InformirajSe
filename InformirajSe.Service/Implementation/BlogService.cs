using InformirajSe.Common.Models;
using InformirajSe.Domain.DTO;
using InformirajSe.Domain.Models;
using InformirajSe.Repository.Interfaces;
using InformirajSe.Service.Interfaces;

namespace InformirajSe.Service.Implementation
{
    public class BlogService : IBlogService
    {
        private readonly IRepository<Blog> repository;
        
        public BlogService(IRepository<Blog> repository)
        {
            this.repository = repository;
        }

        public Blog AddNewBlog(Blog blog)
        {
            return repository.Insert(blog);
        }

        public void DeleteBlog(Guid id)
        {
            var blog = this.GetById(id);

            if (UserProfile.Session?.User?.Id != blog.UserId)
            {
                throw new Exception();
            }

            repository.Delete(blog);
        }

        public List<Blog> FilterBlogs(string keyword, string order)
        {
            var blogs = repository.GetAll();

            if (!string.IsNullOrEmpty(keyword))
            {
                blogs = blogs.Where(x => x.Title.Contains(keyword));
            }

            if (!string.IsNullOrEmpty(order))
            {
                blogs = order == "descending" ? blogs.OrderByDescending(x => x.DateCreated) : blogs.OrderBy(x => x.DateCreated);
            }

            return blogs.ToList();
        }

        public List<Blog> FindMostInterestingBlogs()
        {
            return repository.GetAll().OrderByDescending(x => x.Comments.Count).Take(10).ToList();
        }

        public List<Blog> GetAllBlogs()
        {
            return repository.GetAll().ToList();
        }

        public Blog GetById(Guid id)
        {
            return repository.Get(id);
        }

        public Blog UpdateBlog(EditBlogDTO editBlogDTO)
        {
            var updated = repository.Get(editBlogDTO.Id);

            if(UserProfile.Session?.User?.Id != updated.UserId)
            {
                throw new Exception();
            }

            updated.Title = editBlogDTO.Title;
            updated.ContentBody = editBlogDTO.BodyContent;

            return repository.Update(updated);
        }
    }
}
