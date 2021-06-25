import {Util} from './util';
import {TreeNode} from 'primeng/primeng';
/**
 * Created by ashok on 28/06/17.
 */

describe('Test util', ()=>{

    it('groupBy',()=>{
        let people = [{lastName: 'Shetty', firstName: 'Ashok'},
            {lastName:'Dodwad', firstName: 'Raghu'},
            {lastName: 'Shetty', firstName: 'Anil'},
            {lastName:'Shetty', firstName:'Arun'},
            {lastName:'Dodwad', firstName:'Guru'}];
        let grouped = Util.groupBy(people, 'lastName');
        expect(grouped).toBeTruthy();
        console.log(JSON.stringify(grouped));
        expect(grouped.Shetty).toBeTruthy();
        expect(grouped.Shetty.length).toEqual(3);
        expect(grouped.Dodwad).toBeTruthy();
        expect(grouped.Dodwad.length).toEqual(2);

        let nodes: TreeNode[] = Util.getTreeNodes(people, ['lastName']);
        expect(nodes).toBeTruthy();
        expect(nodes.length).toEqual(2);
        console.log(JSON.stringify(nodes));
    });

    it('multiGroupBy', ()=>{
        let people = [{lastName: 'Shetty', firstName: 'Ashok', gender: 'M'},
                      {lastName:'Dodwad', firstName: 'Raghu', gender: 'M'},
                      {lastName: 'Shetty', firstName: 'Anil', gender: 'M'},
                        {lastName:'Dodwad', firstName: 'Seema', gender: 'F'},
                    {lastName:'Dodwad', firstName: 'Aanchal', gender: 'F'},
                      {lastName:'Shetty', firstName:'Arun', gender: 'M'},
                      {lastName:'Dodwad', firstName:'Guru', gender: 'M'},
                    {lastName:'Shetty', firstName:'Veena', gender: 'F'},
                     {lastName:'Shetty', firstName:'Vanshika', gender: 'F'}];
        let grouped = Util.groupByFields(people, ['lastName', 'gender']);
        expect(grouped).toBeTruthy();
        console.log(JSON.stringify(grouped));
    });
})