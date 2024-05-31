/*
class AnswerButton{

    constructor(root){
        //id = ke1cq03h_ch12.04m_choice_1
        this.main_element = root
        this.options = {
            1:document.getElementById("ke1cq03h_ch12.04m_choice_1"),
            2:document.getElementById("ke1cq03h_ch12.04m_choice_2"),
            3:document.getElementById("ke1cq03h_ch12.04m_choice_3"),
            4:document.getElementById("ke1cq03h_ch12.04m_choice_4"),
        }
    }

    click(option) {
        if (option > 4 || option < 1) {
            return false;
        }
        try {
            if (this.options[option]) {
                this.options[option].click();
                console.log("Clicked()");
            } else {
                console.log("Element with option", option, "not found.");
            }
        } catch (error) {
            console.log("Error clicking option:", error);
        }
    }

    select(option){
        this.click(option)
    }
}

class Prompt{

    constructor(id_num){
        this._root_element = document.getElementById(id_num);
        console.log(id_num + " created");

        this._question = null;
        this._options = [
             new AnswerButton(this._root_element), 
             new AnswerButton(this._root_element),
             new AnswerButton(this._root_element),
             new AnswerButton(this._root_element)
            ]
    }

    process(){
        this.select()
        //this.question('search')
        //this.select_answer(1)
    }

    select_answer(answer){
        this._options[answer].select()
    }

    question(action){
        if(action === 'search'){
            //Can also call selenium or some script that parses quizlet
            var question = ""
            question = this._root_element.getElementsByClassName("problemTypes")
            this._question = question.getAttribute("innerHTML")
        }
        else if(action == 'read'){
            return this._question; 
        }
    }

    select(){
        try{
            this._root_element.click()
        }
        catch(error){
            console.log("Error in select()", error)
        }
    }

    print(){

    }
}


class QuizBot{

    constructor(que_nums){
        this._prompts = []
        this.array = ["itemTakeNavLink_1", "itemTakeNavLink_2", "itemTakeNavLink_3", "itemTakeNavLink_4", "itemTakeNavLink_5", "itemTakeNavLink_6", "itemTakeNavLink_7"];
        
        //for(let i = 1; i <= que_nums; i++){
        //    this._prompts.push(new Prompt(array[i]))
        //}

        this._prompts.push(new Prompt("itemTakeNavLink_1"))
        this._prompts.push(new Prompt("itemTakeNavLink_2"))
        this._prompts.push(new Prompt("itemTakeNavLink_3"))
        this._prompts.push(new Prompt("itemTakeNavLink_4"))

    }   

    run(){
        for(let i = 0; i < this._prompts.length; i++){
            this._prompts[i].process()
        }
    }
}
*/