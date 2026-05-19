import { defineCollection } from 'astro:content';

const pages = defineCollection({});
const projects = defineCollection({});
const settings = defineCollection({});
const testimonials = defineCollection({});

export const collections = {
  pages,
  projects,
  settings,
  testimonials,
};
