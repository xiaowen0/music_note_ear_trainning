/**
 * Created by Kevin on 2019/1/27.
 */

var music_scale_resources = [];
var middle_c_index = 39 - 1;

(function()
{
    for (var i=35; i<=46; i++)
    {
        var number = i;
        number < 10 ? number = '0' + number : null;
        var source_name = 'resources/music_scale/piano_key_' + number + '.mp3';
        music_scale_resources.push(source_name);
    }
})();

var resourcesLoader = {

    list : [],
    loadedCount : 0,
    errorCount : 0,

    /**
     * load some resources
     * @param Array list
     * @param Function callback
     */
    load : function(list, callback)
    {
        var me = this;

        if (list.length < 1)
        {
            if (callback)
            {
                callback();
            }
            return;
        }

        me.list = me.list.concat(list);

        for (var i=0; i<list.length; i++)
        {
            $.ajax({
                url : list[i],
                success : function ()
                {
                    me.loadedCount++;

                    if (me.loadedCount == me.list.length)
                    {
                        if (callback)
                        {
                            callback();
                        }
                    }
                },
                error : function (){
                    me.errorCount++;
                }
            });
        }
    }

};

resourcesLoader.load(music_scale_resources, function(){
    console.log('资源加载完毕。');
});

var music_tonality = {
    'C_major' : {
        scale : ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    },
    'G_major' : {
        scale : ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
    },
    'D_major' : {
        scale : ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
    },
    'A_major' : {
        scale : ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
    },
    'E_major' : {
        scale : ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
    },
    'B_major' : {
        scale : ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    },
    'F#_major' : {
        scale : ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']
    },
    'F_major' : {
        scale : ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
    },
    'Bb_major' : {
        scale : ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']
    },
    'Eb_major' : {
        scale : ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
    },
    'Ab_major' : {
        scale : ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']
    },
    'Db_major' : {
        scale : ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
    },
    'Gb_major' : {
        scale : ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
    }
};

/**
 * @param String tonality
 * @returns Array|null
 */
function getMusicTonalityScale(tonality)
{
    for (var name in music_tonality)
    {
        if (name === tonality)
        {
            return music_tonality[name].scale;
        }
    }

    return null;
}

var AudioPlayer = document.createElement('audio');
function playAudio(url)
{
    AudioPlayer.pause();
    AudioPlayer.src = url;
    AudioPlayer.play();
}

var app = new Vue({
    el : '#app',
    data : {
        tonalityList : music_tonality,
        NoteList : getMusicTonalityScale('C_major'),
        degreeOfDifficulty : 'easy',
        testingScaleList : [1,2,3,4,5]
    },
    methods : {
        changeTonality : function (event){
            var target = event.target;
            var tonality = target.value;
            this.NoteList = getMusicTonalityScale(tonality);
        },
        playNote : function(event)
        {
            // 根据目标按钮，计算出在音阶里面的位置，从而确定其级数。
            var target = event.target;
            var scale_index = $(target).index('#scaleList > button') + 1;

            // 获取当前的调性，根据调性，决定主音用哪个键。
            var tonality = $('#tonalitySelectbox').val();
            console.log(tonality + '第' + scale_index + '级音阶。');
            var piano_key_index = middle_c_index;
            switch (tonality)
            {
                case 'C_major' :
                    piano_key_index = middle_c_index; break;
                case 'G_major' :
                    piano_key_index = middle_c_index + 7; break;
                case 'D_major' :
                    piano_key_index = middle_c_index + 2; break;
                case 'A_major' :
                    piano_key_index = middle_c_index - 3; break;
                case 'E_major' :
                    piano_key_index = middle_c_index + 4; break;
                case 'B_major' :
                    piano_key_index = middle_c_index - 1; break;
                case 'F#_major' :
                    piano_key_index = middle_c_index + 6; break;
                case 'F_major' :
                    piano_key_index = middle_c_index + 5; break;
                case 'Bb_major' :
                    piano_key_index = middle_c_index - 2; break;
                case 'Eb_major' :
                    piano_key_index = middle_c_index + 3; break;
                case 'Ab_major' :
                    piano_key_index = middle_c_index + 8; break;
                case 'Db_major' :
                    piano_key_index = middle_c_index + 1; break;
                case 'Gb_major' :
                    piano_key_index = middle_c_index + 6; break;
            }

            // 根据主音所在键盘的位置，加上相对的级数，得出最终要弹的键。
            switch (scale_index)
            {
                case 1 : break;
                case 2 : piano_key_index += 2;  break;
                case 3 : piano_key_index += 4;  break;
                case 4 : piano_key_index += 5;  break;
                case 5 : piano_key_index += 7;  break;
                case 6 : piano_key_index += 9;  break;
                case 7 : piano_key_index += 11;  break;
            }

            // 播放对应的音乐文件
            playAudio(music_scale_resources[piano_key_index-1]);
        },
        changeDegreeOfDifficulty : function (){
            this.nextTestingCase();
        },
        nextTestingCase : function ()
        {
            var range = 5;

            switch (this.degreeOfDifficulty)
            {
                case 'easy' :
                    break;
                case 'normal' :
                    range = 7;  break;
            }

            this.testingScaleList = [];

            // 随机生成5个音阶级别
            for (var i=1; i<=5; i++)
            {
                var number = Math.ceil(Math.random() * range);
                if (number < 1)
                {
                    number = 1;
                }

                this.testingScaleList.push(number);
            }
        },
        playTestingScaleList : function ()
        {
            var me = this;
            for (var i=0; i<this.testingScaleList.length; i++)
            {
                (function(number, delay){
                    window.setTimeout(function(){
                        $('#scaleList > button').eq(number - 1).click();
                    }, delay);
                })(me.testingScaleList[i], i * 1000);
            }
        },
        init : function (){
            this.nextTestingCase();
        }
    }
});
app.init();
