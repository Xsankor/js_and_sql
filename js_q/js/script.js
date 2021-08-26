let org_selector    = document.querySelector('#org_select'),
    emp_sel         = document.querySelector('#employees_select'),
    check_prof      = document.querySelector('.check_prof'),
    button_add      = document.querySelector('.b_add'),
    button_clear    = document.querySelector('.b_clr'),

    text_box        = document.querySelector('table'),

    selected_org, selected_emp, prof,

    new_td_name,new_td_org,new_td_pos,

    organization    = [[1, "Lada"], [2, "Audi"], [3, "Toyoya"]],
    position        = [[10, "Директор"], [20, "Инженер"], [30, "Менеджер"]],
    employees       = 
[
    [1, "Сидоров Иван Петрович", 1, 10], 
    [2, "Клюквина Анастасия Викторовна", 1, 30], 
    [3, "Yoshimoro Katsumi", 3, 10],  
    [4, "Albrecht Wallenstein", 2, 20], 
    [5, "Архипов Федот Ярополкович", 1, 20],
    [6, "Синицына Ксения Игоревна", 1, 30],
    [7, "Gustaf Grefberg", 2, 10],
    [8, "Simidzu Koyama", 3, 20],   
    [9, "Miura Hirana", 3, 20],  
    [10, "Кузьмин Егор Владимирович", 1, 30],
    [11, "Мазурик Алёна Васильевна", 1, 20],
    [12, "Gudrun Ensslin", 2, 30],
    [13, "Ernst Rommel", 2, 20] 
];

addOrganization(org_selector, organization);

button_add.addEventListener('click', function()
{
    if(!selected_emp) return;

    new_td_name = document.createElement('td');
    new_td_org  = document.createElement('td');
    new_td_pos  = document.createElement('td');
    new_tr      = document.createElement('tr');

    new_td_name.appendChild(document.createTextNode(`${employees[selected_emp - 1][1]}`));
    new_td_org.appendChild(document.createTextNode(`${organization[selected_org - 1][1]}`));
    new_td_pos.appendChild(document.createTextNode(`(${position[employees[selected_emp - 1][3] / 10 - 1][1]})`));

    new_tr.appendChild(new_td_name);
    new_tr.appendChild(new_td_org);
    new_tr.appendChild(new_td_pos);

    text_box.appendChild(new_tr);

});

button_clear.addEventListener('click', function()
{
    let countRow = text_box.rows.length;
    for(let i = 1; i < countRow; ++i)
    {
        text_box.deleteRow(1)
    }
});

org_selector.addEventListener('change', function(event)
{
    selected_org = event.target.value;

    changeEmployInSelection();
});

for(let i = 0; i < check_prof.length; ++i)
{
    check_prof[i].addEventListener('change', function(event)
    {   
        for(let j = 0; j < check_prof.length; ++j)
        {
            if(i != j)
            {
                check_prof[j].checked = false;
            }
        }
        
        if(check_prof[i].checked)
        {
            prof = event.target.value;
        }else
        {
            prof = null;
        }
        changeEmployInSelection();
    });
}

emp_sel.addEventListener('change', function(event)
{
    selected_emp = event.target.value;
});

function addOrganization(val, arr)
{
    for(let i = 0; i < arr.length; ++i)
    {
        val.append(new Option(arr[i][1], arr[i][0]));
    }
}

function addEmployInSelection(val, arr, org, prof = 'all')
{
    for(let i = 0; i < arr.length; ++i)
    {
        if(arr[i][2] == org && (prof == arr[i][3] || prof == 'all'))
        {
            val.append(new Option(arr[i][1], arr[i][0]));
        }
    }
}

function changeEmployInSelection()
{
    clearSelector();
    selected_emp = '';
    if(prof)
    {
        addEmployInSelection(emp_sel, employees, selected_org, prof);
    }else
    {
        addEmployInSelection(emp_sel, employees, selected_org);
    }
}

function clearSelector()
{
    while(emp_sel.options.length > 1)
    {
        emp_sel.remove(1);
    }
}

