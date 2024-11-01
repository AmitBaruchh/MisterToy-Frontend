import { legacy_createStore } from 'redux'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOY_STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getLabels,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(TOY_STORAGE_KEY).then(toys => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
        }

        if (filterBy.price) {
            toys = toys.filter(toy => toy.price >= filterBy.price)
        }

        if (filterBy.inStock) {
            toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
        }

        if (filterBy.labels && filterBy.labels.length) {
            toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
        }

        return toys
    })
}

function getById(toyId) {
    return storageService.get(TOY_STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_STORAGE_KEY, toy)
    } else {
        return storageService.post(TOY_STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(TOY_STORAGE_KEY, toyId)
}

function getLabels() {
    return [...labels]
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getRandomToy() {
    return {
        name: 'Toy-' + utilService.makeId(3),
        price: utilService.getRandomIntInclusive(10, 100),
        labels: _getRandomLabels(),
        inStock: Math.random() > 0.5,
        _id: utilService.makeId(),
    }
}

function getDefaultFilter() {
    return { txt: '', price: '', inStock: '' }
}

function _getRandomLabels(numOfLabels = 2) {
    const labelsStr = []
    while (labelsStr.length < numOfLabels) {
        const labelIdx = utilService.getRandomIntInclusive(0, labels.length - 1)
        const label = labels[labelIdx]

        if (!labelsStr.includes(label)) {
            labelsStr.push(label)
        }
    }
    return labelsStr
}

function _createToys(count = 20) {
    let toys = JSON.parse(localStorage.getItem(TOY_STORAGE_KEY))
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < count; i++) {
            toys.push(getRandomToy())
        }
        localStorage.setItem(TOY_STORAGE_KEY, JSON.stringify(toys))
    }
}
