const { test, expect, beforeEach, describe } = require('@playwright/test')
import { createBlog, loginWith } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to app')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'tyko', '1234')
      await expect(page.getByText('Tyko logged in')).not.toBeVisible()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Second User',
        username: 'suser',
        password: 'secret'
      }
    })

    await page.goto('/')
  })

  test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'new blog' }).click()
    await createBlog(page, 'adventures', 'sir richard', 'blog.spot')
    const successMessage = await page.locator('.message')
    await expect(successMessage).toContainText(`a new blog adventures by sir richard added`)
  })

  test('a blog can be liked', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'new blog' }).click()
    await createBlog(page, 'tykolentin seikkailut', 'tyko', 'tyk.kkit')
    await expect(page.locator('.blogHidden')).toContainText('tykolentin seikkailut')
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.locator('.blogShown')).toContainText('likes 1')
  })

  test('a blog can be deleted', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept())

    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'new blog' }).click()
    await createBlog(page, 'tykolentin seikkailut', 'tyko', 'tyk.kkit')
    await expect(page.locator('.blogHidden')).toContainText('tykolentin seikkailut')
    await page.getByRole('button', { name: 'view' }).click()
    
    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.locator('.blogHidden')).not.toBeVisible()
  })

  test('only the person who created the blog sees the remove button', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'new blog' }).click()
    await createBlog(page, 'tykolentin seikkailut', 'tyko', 'tyk.kkit')
    await expect(page.locator('.blogHidden')).toContainText('tykolentin seikkailut')
    await page.getByRole('button', { name: 'view' }).click()
    
    await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

    await page.getByRole('button', { name: 'log out' }).click()
    await loginWith(page, 'suser', 'secret')
    await page.getByRole('button', { name: 'view' }).click()
    
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })

  test('blogs are sorted correctly according to like amount', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await page.getByRole('button', { name: 'new blog' }).click()
    await createBlog(page, 'first blog', 'tyko', 'tyk.kkit')
    await expect(page.locator('.blogHidden')).toContainText('first blog')
    await createBlog(page, 'second blog', 'tyko', 'tyk.kkit/url')
    await expect(page.getByText('second blog tyko')).toBeVisible()

    await page
      .locator('.blogHidden')
      .filter({ hasText: 'second blog tyko' })
      .getByRole('button', { name: 'view' })
      .click()
    
    await page
      .locator('.blogShown')
      .getByRole('button', { name: 'like' })
      .click()
    
    await page
      .locator('.blogShown')
      .getByRole('button', { name: 'hide'})
      .click()
    
    await expect(page.locator('.blogHidden').locator('nth=0')).toHaveText('second blog tykoview')
  })
})

