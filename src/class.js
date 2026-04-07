class Person {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    getInfo() {
        return `${this.id} - ${this.name} - ${this.age}`;
    }

    updateName(newName) {
        this.name = newName;
    }
}

    class PersonData {
        constructor() {
            this.list = [];
        }

        addPerson(person) {
            this.list.push(person);
        }

        deletePerson(id) {
            this.list = this.list.filter(p => p.id !== id);
        }

        updatePerson(id, newName) {
            let person = this.list.find(p => p.id === id);
            if (person) {
                person.updateName(newName);
            }
        }

        getAll() {
            return this.list;
        }
    }

    class RowTable {
        static createRow(person) {
            return `
                <tr>
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.age}</td>
                    <td>
                        <button onclick="edit(${person.id})">Sửa</button>
                        <button onclick="remove(${person.id})">Xóa</button>
                    </td>
                </tr>
            `;
        }
    }


    class Render {
        static renderTable(list) {
            let html = "";
            list.forEach(person => {
                html += RowTable.createRow(person);
            });
            document.getElementById("tableBody").innerHTML = html;
        }
    }


    let data = new PersonData();

    // thêm dữ liệu
    data.addPerson(new Person(1, "An", 20));
    data.addPerson(new Person(2, "Bình", 22));

    // render
    Render.renderTable(data.getAll());

    // hàm xoá
    function remove(id) {
        data.deletePerson(id);
        Render.renderTable(data.getAll());
    }

    // hàm sửa
    function edit(id) {
        let newName = prompt("Nhập tên mới:");
        data.updatePerson(id, newName);
        Render.renderTable(data.getAll());
    }