import { addPost, deletePost, editPost, getPost, getPosts, type IPostType } from '@/lib/api/posts/posts';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '@/axios_instance';

// Mock the API module
vi.mock('@/axios_instance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

// Explicitly type the mocked API methods
const mockedApi = api as jest.Mocked<typeof api>;

describe('CRUD Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPost: IPostType = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post',
    userId: 1,
  };

  const mockPosts: IPostType[] = [mockPost];

  describe('getPosts', () => {
    it('should fetch posts for a given page number', async () => {
      const mockPosts: IPostType[] = [
        { id: 1, title: 'Test Post', body: 'This is a test post', userId: 1 },
      ];

      // Mock the API response
      mockedApi.get.mockResolvedValueOnce({ data: mockPosts });

      // Call the function
      const result = await getPosts(1);

      // Assert that the API was called with the correct URL
      expect(mockedApi.get).toHaveBeenCalledWith('/posts?_limit=10&_page=1');

      // Assert that the function returns the expected data
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPost', () => {
    it('should fetch a single post by id', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: mockPost });

      const result = await getPost(1);

      expect(mockedApi.get).toHaveBeenCalledWith('/posts/1');
      expect(result).toEqual(mockPost);
    });
  });

  describe('addPost', () => {
    it('should add a new post', async () => {
      const newPost = { title: 'New Post', body: 'New body' };
      mockedApi.post.mockResolvedValueOnce({ data: mockPosts });

      const result = await addPost(newPost);

      expect(mockedApi.post).toHaveBeenCalledWith('/posts', { ...newPost, userId: 1 });
      expect(result).toEqual(mockPosts);
    });
  });

  describe('editPost', () => {
    it('should edit an existing post', async () => {
      const updatedData = { title: 'Updated Post' };
      mockedApi.patch.mockResolvedValueOnce({ data: mockPosts });

      const result = await editPost(1, updatedData);

      expect(mockedApi.patch).toHaveBeenCalledWith('/posts/1', updatedData);
      expect(result).toEqual(mockPosts);
    });
  });

  describe('deletePost', () => {
    it('should delete a post by id', async () => {
      mockedApi.delete.mockResolvedValueOnce({ data: mockPosts });

      const result = await deletePost(1);

      expect(mockedApi.delete).toHaveBeenCalledWith('/posts/1');
      expect(result).toEqual(mockPosts);
    });
  });
});