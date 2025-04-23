INSERT INTO "tag" (name, "createdBy", "updatedBy", "createdAt", "updatedAt") 
VALUES 
  ('Web Development', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW()),
  ('JavaScript', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW()),
  ('Node.js', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW()),
  ('React', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW()),
  ('Programming Tips', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW()),
  ('UI/UX Design', (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), (SELECT id FROM public.admin WHERE email = 'blog.admin@yopmail.com' LIMIT 1), NOW(), NOW());
