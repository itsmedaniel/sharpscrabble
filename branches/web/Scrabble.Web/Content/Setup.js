﻿(function ()
{
    var dialog, playerContainer, playerCount, radioCount;

    function addPlayerRow(removable, human)
    {
        if (playerCount >= 4)
            return;
        removable = removable || false;
        human = human || false;
        var nameAttr = 'players[{0}].Name'.format(playerCount);
        var row = $('<div>')
            .addClass('row')
            .addClass(human ? 'Human' : '')
            .addClass(removable ? 'removable' : '')
            .append(humanComputerPicker(playerCount, human))
            .append($('<input>').attr('name', nameAttr).attr('type', 'text').focus(nameFocus).blur(nameBlur).addClass('watermark').val('Player Name'))
            .append(moveGeneratorDropDown(playerCount))
            .append(utilityFunctionDropDown(playerCount));
        if (removable)
            row.append(removeLink());
        row.appendTo(playerContainer);
        playerCount++;
        checkEnableHuman();
    }

    function nameFocus()
    {
        if ($(this).hasClass('watermark'))
            $(this).removeClass('watermark').val('');
    }

    function nameBlur()
    {
        if ($(this).val() == '')
            $(this).addClass('watermark').val('Player Name');
        else
            $(this).removeClass('watermark');
    }

    function moveGeneratorDropDown(index)
    {
        return $('<select>')
                    .addClass('com')
                    .attr('name', 'players[{0}].Provider'.format(playerCount))
                    .append($('<option>').attr('value', '').text('Select AI Type'))
                    .append($('<option>').attr('value', '0').text('Brute Force (Strong)'))
                    .append($('<option>').attr('value', '1').text('Hill Climber, 15 restarts (Medium)'))
                    .append($('<option>').attr('value', '2').text('Hill Climber, 5 restarts (Weak)'));
    }

    function utilityFunctionDropDown(index)
    {
        return $('<select>')
                    .addClass('com')
                    .attr('name', 'players[{0}].UtilityFunction'.format(playerCount))
                    .append($('<option>').attr('value', '').text('Select Utility Function'))
                    .append($('<option>').attr('value', '0').text('Max Score'))
                    .append($('<option>').attr('value', '1').text('Smart Plural Words'))
                    .append($('<option>').attr('value', '2').text('Bingo Saver'))
                    .append($('<option>').attr('value', '3').text('7 or More Letter Words'))
                    .append($('<option>').attr('value', '4').text('5 or More Letter Words'))
                    .append($('<option>').attr('value', '5').text('Bonus Square User'));
    }

    function removeLink()
    {
        return $('<a>').addClass('remove').click(function ()
        {
            playerCount--;
            $(this).parent().remove();
            checkEnableHuman();
        });
    }

    function humanComputerPicker(index, isHuman)
    {
        var name = 'players[{0}].Type'.format(index);
        var humanCheck = $('<input>').attr('type', 'radio').attr('id', 'radio' + radioCount).attr('name', name).val('Human');
        var humanLabel = $('<label>').attr('for', 'radio' + radioCount).text('Human')
        radioCount++;
        var computerCheck = $('<input>').attr('type', 'radio').attr('id', 'radio' + radioCount).attr('name', name).val('Computer');
        var computerLabel = $('<label>').attr('for', 'radio' + radioCount).text('Computer');
        radioCount++;
        (isHuman ? humanCheck : computerCheck).attr('checked', 'checked');
        return $('<div>')
                    .addClass('radiogroup')
                    .append(humanCheck)
                    .append(humanLabel)
                    .append(computerCheck)
                    .append(computerLabel)
                    .buttonset()
                    .change(function ()
                    {
                        var cssClass = $('input:radio:checked', $(this)).val();
                        $(this).parent().removeClass('Human Computer').addClass(cssClass);
                        checkEnableHuman();
                    });
    }

    function checkEnableHuman()
    {
        var selected = $('input:radio:checked[value="Human"]:first');
        if (selected.length != 0)
        {
            $('input:radio[value="Human"]').each(function ()
            {
                if ($(this) != selected)
                    $(this).button('disable');
            });
        }
        else
        {
            $('.ui-buttonset input[value="Human"]').button('enable');
        }
    }

    function validate()
    {
        return true;
    }

    function showError()
    {
        alert('Please fill out the Name for humans, and AI type for computers.');
    }

    $(document).ready(function ()
    {
        playerContainer = $('#playerContainer');
        playerCount = 0;
        radioCount = 0;
        addPlayerRow(false, true);
        addPlayerRow(false);
        $('#addPlayer').click(function (e)
        {
            e.preventDefault();
            addPlayerRow(true);
        });

        var okClick = function ()
        {
            if (validate())
            {
                console.log('clicked');
                $('#setupForm').submit();
                $('button', dialog.parent()).button('disable');
            }
            else
                showError();
        };
        dialog = $('#playerDialog').dialog(
        {
            width: 'auto', modal: true, autoOpen: true, title: 'Choose Players', closeOnEscape: false, buttons: [{ text: 'Start Game', click: okClick}]
        });
    });
})();