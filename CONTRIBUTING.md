# Contributing to DeployPrime Portfolio

Thank you for considering contributing to this project!

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Development Guidelines

### Code Style

- Use ES6+ features
- Follow existing code formatting
- Add comments for complex logic
- Keep functions small and focused

### Backend

- Use async/await for asynchronous code
- Validate all inputs
- Handle errors properly
- Add JSDoc comments for functions
- Write tests for new features

### Frontend

- Use functional components with hooks
- Keep components small and reusable
- Use Tailwind CSS for styling
- Ensure responsive design
- Test on multiple browsers

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/config changes

Example: `feat: add project filtering by technology`

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if added)
cd frontend
npm test
```

### Documentation

- Update README.md if needed
- Add JSDoc comments for new functions
- Update API documentation for new endpoints
- Include examples where helpful

## Project Structure

```
deployprime-portfolio/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   └── tests/           # Test files
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utilities
│   └── public/          # Static assets
└── docs/                # Documentation
```

## Getting Help

- Check existing documentation
- Search closed issues
- Ask in discussions
- Contact maintainers

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
