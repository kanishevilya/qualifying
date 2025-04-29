import { Card, Group, Tag } from './types'

export const mockTags: Tag[] = [
    { id: '1', name: 'Geography' },
    { id: '2', name: 'Europe' },
    { id: '3', name: 'Literature' },
    { id: '4', name: 'Drama' },
    { id: '5', name: 'Chemistry' },
    { id: '6', name: 'Elements' },
    { id: '7', name: 'History' },
    { id: '8', name: 'World Wars' },
    { id: '9', name: 'Astronomy' },
    { id: '10', name: 'Planets' },
]

export const mockGroups: Group[] = [
    { id: '1', name: 'General Knowledge' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'Arts' },
]

export const mockCards: Card[] = [
    {
        id: '1',
        questions: ['What is the capital of France?'],
        fact: 'The capital of France is Paris.',
        tags: [mockTags[0], mockTags[1]],
        groupIds: ['1'],
        groups: [mockGroups[0]],
        remembered: false,
    },
    {
        id: '2',
        questions: ['Who wrote "Romeo and Juliet"?'],
        fact: 'William Shakespeare wrote "Romeo and Juliet".',
        tags: [mockTags[2], mockTags[3]],
        groupIds: ['3'],
        groups: [mockGroups[2]],
        remembered: false,
    },
    {
        id: '3',
        questions: ['What is the chemical symbol for gold?'],
        fact: 'The chemical symbol for gold is Au.',
        tags: [mockTags[4], mockTags[5]],
        groupIds: ['2'],
        groups: [mockGroups[1]],
        remembered: false,
    },
    {
        id: '4',
        questions: ['In which year did World War II end?'],
        fact: 'World War II ended in 1945.',
        tags: [mockTags[6], mockTags[7]],
        groupIds: ['1'],
        groups: [mockGroups[0]],
        remembered: false,
    },
    {
        id: '5',
        questions: ['What is the largest planet in our solar system?'],
        fact: 'Jupiter is the largest planet in our solar system.',
        tags: [mockTags[8], mockTags[9]],
        groupIds: ['2'],
        groups: [mockGroups[1]],
        remembered: false,
    },
]

